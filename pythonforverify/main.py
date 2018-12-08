import hashlib
import hmac
import base64


def generateSeed(input):
    seed = hashlib.sha256(input.encode('utf-8'))
    for i in range(1000):
        seed = hashlib.sha256(seed.hexdigest().encode('utf-8'))
    print(seed.hexdigest())
    return seed.hexdigest()


def generatePassws(intputKey, seed):
    passwd = hmac.new(key=seed.encode('utf-8'), msg=intputKey.encode('utf-8'), digestmod=hashlib.sha256)
    print(passwd.hexdigest())
    for i in range(1000):
        passwd = hashlib.sha256(passwd.hexdigest().encode('utf-8'))
    print("passwd is "+passwd.hexdigest())


if __name__ == "__main__":
    seed = 'n'
    key = '1'
    seedHash = generateSeed(seed)
    generatePassws(key, seedHash)
