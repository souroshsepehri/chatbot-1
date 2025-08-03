"""
FAQ service to handle custom FAQ lookups from JSON file.
"""

import json
import os
from typing import Optional, Dict, List


class FAQService:
    """Service to handle custom FAQ lookups."""
    
    def __init__(self, faq_file_path: str = "data/custom_faq.json"):
        """
        Initialize the FAQ service.
        
        Args:
            faq_file_path (str): Path to the FAQ JSON file
        """
        self.faq_file_path = faq_file_path
        self.faqs = self._load_faqs()
    
    def _load_faqs(self) -> List[Dict[str, str]]:
        """
        Load FAQs from the JSON file.
        
        Returns:
            List[Dict[str, str]]: List of FAQ dictionaries
        """
        try:
            if not os.path.exists(self.faq_file_path):
                print(f"Warning: FAQ file not found at {self.faq_file_path}")
                return []
            
            with open(self.faq_file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            return data.get("faqs", [])
            
        except json.JSONDecodeError as e:
            print(f"Error: Invalid JSON in FAQ file: {e}")
            return []
        except Exception as e:
            print(f"Error: Failed to load FAQ file: {e}")
            return []
    
    def search_faq(self, question: str) -> Optional[str]:
        """
        Search for an exact match in the FAQ database (case-insensitive).
        
        Args:
            question (str): The question to search for
            
        Returns:
            Optional[str]: The answer if found, None otherwise
        """
        if not self.faqs:
            return None
        
        # Normalize the question for comparison
        normalized_question = question.strip().lower()
        
        # Search for exact match
        for faq in self.faqs:
            faq_question = faq.get("question", "").strip().lower()
            if faq_question == normalized_question:
                return faq.get("answer", "")
        
        return None
    
    def search_faq_partial(self, question: str) -> Optional[str]:
        """
        Search for partial matches in the FAQ database (case-insensitive).
        
        Args:
            question (str): The question to search for
            
        Returns:
            Optional[str]: The answer if found, None otherwise
        """
        if not self.faqs:
            return None
        
        # Normalize the question for comparison
        normalized_question = question.strip().lower()
        
        # Search for partial matches
        for faq in self.faqs:
            faq_question = faq.get("question", "").strip().lower()
            if normalized_question in faq_question or faq_question in normalized_question:
                return faq.get("answer", "")
        
        return None
    
    def get_all_faqs(self) -> List[Dict[str, str]]:
        """
        Get all FAQs from the database.
        
        Returns:
            List[Dict[str, str]]: List of all FAQ dictionaries
        """
        return self.faqs.copy()
    
    def add_faq(self, question: str, answer: str) -> bool:
        """
        Add a new FAQ to the database.
        
        Args:
            question (str): The question
            answer (str): The answer
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            new_faq = {"question": question, "answer": answer}
            self.faqs.append(new_faq)
            
            # Save to file
            data = {"faqs": self.faqs}
            with open(self.faq_file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            return True
            
        except Exception as e:
            print(f"Error: Failed to add FAQ: {e}")
            return False
    
    def reload_faqs(self) -> None:
        """Reload FAQs from the file."""
        self.faqs = self._load_faqs() 