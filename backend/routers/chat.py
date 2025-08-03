"""
Chat router with the /chat endpoint.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from services.faq import FAQService
from services.gpt import GPTService
from services.fallback import FallbackService
from utils.response_check import is_vague_response

# Initialize services
faq_service = FAQService()
gpt_service = GPTService()
fallback_service = FallbackService()

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    response: str
    source: str  # "faq", "gpt", or "fallback"


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint that processes user messages through the following flow:
    1. Check FAQ for exact match
    2. If not found, send to GPT-4
    3. Check if GPT response is vague
    4. If vague, return fallback response
    """
    try:
        message = request.message.strip()
        
        if not message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Step 1: Check FAQ for exact match
        faq_answer = faq_service.search_faq(message)
        if faq_answer:
            return ChatResponse(response=faq_answer, source="faq")
        
        # Step 2: If not found in FAQ, send to GPT-4
        gpt_response = gpt_service.get_response(message)
        
        if not gpt_response:
            # If GPT service fails, return fallback
            fallback_response = fallback_service.get_fallback_response(message)
            return ChatResponse(response=fallback_response, source="fallback")
        
        # Step 3: Check if GPT response is vague
        if is_vague_response(gpt_response):
            # Step 4: If vague, return fallback response
            fallback_response = fallback_service.get_fallback_response(message)
            return ChatResponse(response=fallback_response, source="fallback")
        
        # Step 5: Return GPT's answer if not vague
        return ChatResponse(response=gpt_response, source="gpt")
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "message": "Chat service is running"}


@router.get("/faqs")
async def get_faqs():
    """Get all FAQs."""
    try:
        faqs = faq_service.get_all_faqs()
        return {"faqs": faqs, "count": len(faqs)}
    except Exception as e:
        print(f"Error getting FAQs: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/faqs")
async def add_faq(request: dict):
    """Add a new FAQ."""
    try:
        question = request.get("question")
        answer = request.get("answer")
        
        if not question or not answer:
            raise HTTPException(status_code=400, detail="Question and answer are required")
        
        success = faq_service.add_faq(question, answer)
        
        if success:
            return {"message": "FAQ added successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to add FAQ")
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error adding FAQ: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/logs")
async def get_fallback_logs(limit: Optional[int] = 10):
    """Get recent fallback logs."""
    try:
        logs = fallback_service.get_logs(limit=limit)
        return {"logs": logs, "count": len(logs)}
    except Exception as e:
        print(f"Error getting logs: {e}")
        raise HTTPException(status_code=500, detail="Internal server error") 