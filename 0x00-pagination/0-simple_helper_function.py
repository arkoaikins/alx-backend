#!/usr/bin/env python3
"""
Function that takes two integer arguments and return
a tuple of size two containing a start index and an end index
corresponding to the range of indexes to return in a list
for those particluar pagination parameters
"""


def index_range(page, page_size):
    """
    return a tuple of size two containing a start
    index and an end index
    """
    start_in = (page - 1) * page_size
    end_in = (start_in + page_size)
    return (start_in, end_in)
