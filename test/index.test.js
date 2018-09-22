const keys = require('./mocks/keys');
const RSAXML = require('../lib/rsa-xml');

describe('RSAXML', () => {
  const msgBase64 = '4TkhLlVNK27LQXSRIftGCbwOI2qnBGD0eR61g53KAdw5J+BTpczLpdWGn/9v3I6xGPQYvTB1F2cmbcuBboNGa18b+8gigwbat9vTEuLjD/OKl2V+jpqKf3xxwYYuz1s05HyV8KWxbS01M/iwjWPrcNRWh3vWff9pRAu8Z6KQAQc=';

  describe('constructor', () => {
    test('should be a constructor function', () => {
      expect(() => new RSAXML()).not.toThrow();
    });
    test('should accept a key and container when instantiated', () => {
      const rsa = new RSAXML(keys.privateKeyBase64, 'askjhdf');
      const decrypted = rsa.decrypt(msgBase64, 'askjhdf');

      expect(decrypted).toEqual('Hello World!');
    });
  });


  describe('#importKey', () => {
    let rsa;

    beforeEach(() => {
      rsa = new RSAXML();
    });

    test('should allow me to import a key and use that key when calling decrypt', () => {
      rsa.importKey(keys.privateKeyBase64);
      const decrypted = rsa.decrypt(msgBase64);

      expect(decrypted).toEqual('Hello World!');
    });

    test('should allow me to import keys into a container/namespace', () => {
      rsa.importKey(keys.privateKeyBase64, 'pkey1');
      const decrypted = rsa.decrypt(msgBase64, 'pkey1');

      expect(decrypted).toEqual('Hello World!');
    });
  });

  describe('#decrypt', () => {
    let rsa;

    beforeEach(() => {
      rsa = new RSAXML();
    });

    test('should decrypt message with base64 encoded XML private key', () => {
      rsa.importKey(keys.privateKeyBase64);
      const decrypted = rsa.decrypt(msgBase64);

      expect(decrypted).toEqual('Hello World!');
    });

    test('should decrypt message using XML string private key', () => {
      rsa.importKey(keys.privateKeyXML);
      const decrypted = rsa.decrypt(msgBase64);

      expect(decrypted).toEqual('Hello World!');
    });

    test('should decrypt message using plain text private key', () => {
      rsa.importKey(keys.privateKeyPlainText);
      const decrypted = rsa.decrypt(msgBase64);

      expect(decrypted).toEqual('Hello World!');
    });
  });
});

