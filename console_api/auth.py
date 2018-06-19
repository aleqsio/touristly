import jwt
import urllib.request

class Auth:
    @staticmethod
    def decode_token(token):
        return jwt.decode(str(token),algorithms=['RS256'],verify=False) # TODO: Only for debug, must verify token using "https://touristly.eu.auth0.com/.well-known/jwks.json"
