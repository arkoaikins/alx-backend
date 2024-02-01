#!/usr/bin/env python3
"""
Create a class FIFOCache that inherits
from BaseCaching and is a caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """Inherits from BaseCaching"""
    def __init__(self):
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """
        assign to the dictionary self.cache_data the
        item value for the key key
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            discarded_key = self.queue.pop(0)
            del self.cache_data[discarded_key]
            print(f"DISCARD: {discarded_key}")

        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        """
        returns the value in self.cache_data linked to key
        """
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
