from io import BytesIO
from typing import Tuple

class LogoManager:
    '''In Memory Logo Image Handler'''
    def __init__(self, stream, filename: str) -> None:
        self.stream = BytesIO(stream)
        self.extension = filename.split('.')[-1]
    
    def render(self) -> BytesIO:
        return BytesIO(self.stream.getvalue())
    
    def get_mimetype(self) -> str:
        return f'image/{self.extension}'

class Logos:
    '''Logo Manager(s) Handler'''
    def __init__(self) -> None:
        self.home_logo = None # LogoManager
        self.visitor_logo = None # LogoManager
    
    def set_home(self, stream, filename) -> None:
        self.home_logo = LogoManager(stream, filename)
    
    def set_visitor(self, stream, filename) -> None:
        self.visitor_logo = LogoManager(stream, filename)
    
    def home(self) -> Tuple[BytesIO, str]:
        return self.home_logo.render(), self.home_logo.get_mimetype()
    
    def visitor(self) -> Tuple[BytesIO, str]:
        return self.visitor_logo.render(), self.visitor_logo.get_mimetype()