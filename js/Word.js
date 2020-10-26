function Word(word, island, parent, compoundOf) {
  this.parent = parent;
  this.word = word;
  this.island = island;
  this.compoundOf = compoundOf;
}

Word.VOWELS = [
  'a', 'e', 'ı', 'i', 'u', 'ü', 'ö', 'o','ä',//'ʊ'
];

Word.CONSTS = [
  'b', 'c', 'd', 'f', 'g', 'ğ', 'h', 'j', 'k', 'l', 
  'm', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z','ß','č','ž','đ'
];
//ß is ss č is ch is zh is dzhe
Word.random = function (length, island) {
  length = length || Math.floor(Math.random() * 10);

  var generated = Array.apply(
    null, {
      length: length
    }
  ).reduce(
    function (prev, current) {
      if (Word.VOWELS.indexOf(prev[prev.length - 1]) === -1) {
        return prev + choiceRandom(Word.VOWELS);
      } else {
        return prev + choiceRandom(Word.CONSTS);
      }
    },
    island.prefix
  );

  return new Word(generated, island, null, null);
};

Word.prototype.compoundWith = function (wordInstance, island) {
  var left = this.word.slice(
    Math.floor(this.word.length / 2)
  );

  var right = this.word.slice(
    Math.floor(this.word.length / 2)
  );

  var infix = (
    Word.VOWELS.indexOf(left[left.length - 1]) === -1
      ? choiceRandom(Word.VOWELS)
      : choiceRandom(Word.CONSTS)
  );

  return new Word(
    left + infix + right,
    island,
    this,
    wordInstance
  );
};

Word.prototype.mutateWord = function (soundSet, island) {
  var word = this.word;
  var mutatedSounds = Math.floor(Math.random() * 5) + 1;
  var mutatable = soundSet.filter(function (sound) {
    return word.indexOf(sound) > -1
  });

  for (var i = 0; i < mutatedSounds; i++) {
    word = word.replace(
      choiceRandom(mutatable),
      choiceRandom(soundSet)
    );
  }

  return new Word(word, island, this);
};

Word.prototype.mutateVowel = function (island) {
  return this.mutateWord(Word.VOWELS, island);
};

Word.prototype.mutateConst = function (island) {
  return this.mutateWord(Word.CONSTS, island);
};
