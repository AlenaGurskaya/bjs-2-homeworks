//Задача № 1
function cachingDecoratorNew(func) {
  let cache = []; // Хранилище кэша - массив объектов {hash, value}

  function wrapper(...args) {
    // Создаем уникальный хэш на основе аргументов функции
    const hash = md5(JSON.stringify(args));
    
    // Ищем, есть ли уже такой хэш в кэше
    let objectInCache = cache.find(item => item.hash === hash);
    
    // Если нашли в кэше - возвращаем значение из кэша
    if (objectInCache) {
      console.log("Из кеша: " + objectInCache.value, cache);
      return "Из кеша: " + objectInCache.value;
    }

    // Если не нашли в кэше - вычисляем результат
    let result = func(...args);
    
    // Добавляем новую запись в кэш
    cache.push({
      hash: hash,
      value: result
    });
    
    // Если кэш переполнен (больше 5 элементов) - удаляем самый старый
    if (cache.length > 5) {
      cache.shift(); // shift удаляет первый элемент массива
    }

    console.log("Вычисляем: " + result, cache);
    return "Вычисляем: " + result;
  }

  return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null; // ID текущего таймера
  
  // Добавляем счетчики прямо к функции-обертке
  wrapper.count = 0;     // Счетчик реальных вызовов функции
  wrapper.allCount = 0;  // Счетчик всех попыток вызова

  function wrapper(...args) {
    // Увеличиваем счетчик всех попыток вызова
    wrapper.allCount++;
    
    // Если уже есть активный таймер - отменяем его
    if (timeoutId) {
      console.log('Уже есть таймаут', args);
      clearTimeout(timeoutId);
    }

    // Если это самый первый вызов - выполняем функцию сразу
    if (!wrapper.count) {
      console.log('Первый сигнал', args);
      func.call(this, ...args); // Вызываем функцию с правильным контекстом
      wrapper.count++;
    }

    // Устанавливаем новый таймер
    timeoutId = setTimeout(() => {
      console.log('Задержка больше 200милсек, сработал таймаут');
      func.apply(this, args); // Вызываем функцию с правильным контекстом
      clearTimeout(timeoutId);
      timeoutId = null;
      wrapper.count++;
    }, delay);
  }
  
  return wrapper;
}