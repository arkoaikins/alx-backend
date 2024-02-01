#!/usr/bin/env python3
"""
Create a class MRUCache that inherits from
BaseCaching and is a caching system:
"""
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """Inherits from BaseCaching"""
    def __init__(self):
        super().__init__()
        self.access_list = []

    def put(self, key, item):
        """
        assigns to the dictionary self.cache_data the
        item value for the key key.
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            discarded_key = self.access_list.pop()
            del self.cache_data[discarded_key]
            print(f"DISCARD: {discarded_key}")

        self.cache_data[key] = item
        self.access_list.append(key)

    def get(self, key):
        """
        returns the value in self.cache_data linked to key.
        """
        if key is None or key not in self.cache_data:
            return None

        self.access_list.remove(key)
        self.access_list.append(key)

        return self.cache_data[key]
