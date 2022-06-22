Serviço em NodeJS e Python para atender as seguintes necessidades:
## Extração de textos (OCR) a partir de um documento PDF.
O mesmo espera receber uma requisição com um documento PDF em formato base64, para que seja realizado a conversão do PDF em imagens
e em seguida é realizado a leitura das imagens geradas com python e tesseract parar retornar o texto extraído das imagens.

### Requisitos:
  #### <a href='https://github.com/UB-Mannheim/tesseract/wiki'>Tesseract</a>
  #### <a href='https://www.python.org/downloads/release/python-3100/'>Python 3.10 ou superior.</a>
  #### Bibliotecas Python:
  ##### pytesseract e opencv-python (pip install pytesseract/pip install opencv-python)
### Exemplo de requisição:
![image](https://user-images.githubusercontent.com/53841323/175152102-9131499c-b287-46c8-9d49-ffe89eec0a07.png)

## Converter string com tags html em documento PDF.
Apartir de texto com tags html e atributos css o serviço node interpreta o mesmo utilizando a biblioteca <a href='https://github.com/marcbachmann/node-html-pdf'>html-pdf</a>
e retorna um documento PDF com cabeçalho e respeitando o estilo das tags html e propriedades do css.

![image](https://user-images.githubusercontent.com/53841323/175153648-ec2f852c-c6bf-4f5b-b72c-2739b7e4308b.png)
