import tensorflow as tf
import string
import numpy as np
import textwrap
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Embedding, Dense, Dropout, Input, LSTM
from tensorflow.keras.models import Model
from tensorflow.keras.losses import BinaryCrossentropy
from tensorflow.keras.optimizers import Adam

# Omit reviews longer than this many words
max_sequence_len = 200 

(X_train, y_train), (_, _) = imdb.load_data(maxlen=max_sequence_len)

word_dict = imdb.get_word_index()
for i in range(50):
  for key, value in word_dict.items(): 
    if value == i:
        print('(', key, ',', value, ')', sep = '', end = ',')

print(len(word_dict))

word_dict = {k:(v+3) for k,v in word_dict.items()}
word_dict["<PAD>"] = 0
word_dict["<START>"] = 1
word_dict["<UNK>"] = 2
word_dict["<UNUSED>"] = 3

vocab_size = len(word_dict.keys())
print('Number of words in vocabulary: ', vocab_size)
for i in range(50):
  for key, value in word_dict.items(): 
    if value == i:
        print('(', key, ',', value, ')', sep = '', end = ',')

# Needed to decode training data into readable text
inverse_word_dict = {value:key for key,value in word_dict.items()}


X_train = pad_sequences(X_train, maxlen=max_sequence_len)
print(X_train[-1])

def encode_review(review, word_dict, maxlen):
  encoded_review = []
  for raw_word in review.split(' '):
    word = raw_word.strip().strip(string.punctuation).lower()
    if word is '' or word is '\n':
      continue
    try:
      encoded_review.append(word_dict[word])
    except KeyError as e:
      # raise KeyError(f'{e} not in word dictionary, review not encoded.')
      continue
  return pad_sequences(np.array(encoded_review).reshape(1,-1), maxlen=maxlen)

def decode_review(encoded_review, inverse_word_dict):
  sentence = []
  for encoded_word in encoded_review:
    if encoded_word == 0:
      continue
    sentence.append(inverse_word_dict[encoded_word])
  w = textwrap.TextWrapper(width=120,break_long_words=False,replace_whitespace=False)
  return '\n'.join(w.wrap(' '.join(sentence)))

input_layer = Input(shape=(max_sequence_len))
x = Embedding(vocab_size, 64)(input_layer)

x = LSTM(16)(x) 
 

x = Dense(32, activation='relu')(x)
x = Dropout(0.8)(x)
x = Dense(16, activation='relu')(x)
x = Dropout(0.8)(x)
x = Flatten()(x)



x = Dense(1, activation='sigmoid')(x)
sentiment_model = Model(input_layer, x)

sentiment_model.compile(loss=BinaryCrossentropy(),
              optimizer=Adam(2e-3),
              metrics=['accuracy'])

sentiment_model.fit(X_train, y_train.reshape(-1,1), batch_size=256, epochs=8, validation_split=0.2, shuffle=True)

bad = '''Dull, overlong, and never remotely involving, "Scoob!" makes the silly Matthew Lillard-starring live action films seem rather quaint and joyful by comparison.'''
review = encode_review(bad, word_dict, max_sequence_len)
output = sentiment_model.predict(review)
print('Model output: ', output)
print('Prediction: ', round(output[0][0]))