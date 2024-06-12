from flask import Blueprint, request, jsonify
from Models.Comic import Comics, User_Favorite_comics
from Models.Users import Users
from extensions import db

fComic_bp = Blueprint('fComic', __name__)