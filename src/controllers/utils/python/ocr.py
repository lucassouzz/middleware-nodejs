import sys

import cv2
import pytesseract


paths = sys.argv[1]
pathtxt = sys.argv[2]
pathsPlit = paths.split(",")


texts = ""

for path in pathsPlit:
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    config_tesseract = "--psm 6"
    texto = pytesseract.image_to_string(gray, lang="por", config=config_tesseract)
    texts = texts + texto


def writeFile():
    f = open(pathtxt, "w")
    f.write(texts)
    f.close()
    print("OK")

writeFile()