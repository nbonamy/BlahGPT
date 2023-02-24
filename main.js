
const randint = (min, max) => {
  return Math.round(min + Math.random() * (max-min))
}

const randtext = (items) => {
  return items[Math.floor(Math.random()*items.length)]
}

const randblah = () => {
  return randtext(['blah', 'blah', 'blablah', 'blablah', 'blablablah'])
}

const randwords = async ($para) => {
  const words = randint(5, 12)
  for (let w=0; w<words; w++) {
    if (w != 0) $para.append(' ')
    $para.append(randblah())
    $para.append(' ▌')
    await sleep(randint(0, 200))
    $para.text($para.text().slice(0, -2))
    $('#chat').scrollTop($('#chat').height())
  }
}

const append = (str1, str2) => {
  if (!str1.endsWith('.') && !str1.endsWith('?')) str1 += '.'
  return `${str1} ${str2}`
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const answer = async (msg) => {

  // hide welcome
  $('#welcome').hide()

  // disable
  $('#input textarea').prop('disabled', true)

  // question
  $q = $(`<div class="message question"><img src="user.png"/><div class="text">${msg}</div></div>`)
  $('#chat').append($q)

  // response
  $r = $(`<div class="message answer"><img src="encom.png"/><div class="text"></div></div>`)
  $('#chat').append($r)

  // text
  $t = $r.find('.text')

  // let's do it
  const paras = randint(2, 5)
  for (let p=0; p<paras; p++) {
    let $para = $('<p></p>')
    $t.append($para)
    const sentences = randint(1, 3)
    for (let s=0; s<sentences; s++) {
      await randwords($para)
      if (p == 1 && s == sentences-1 && Math.random() > 0.5) {
        $para.append(':')
        let $ul = $('<ul></ul>')
        $t.append($ul)
        const bullets = randint(2, 5)
        for (let b=0; b<bullets; b++) {
          let $li = $('<li></li>')
          let $b = $('<p></p>')
          $li.append($b)
          $ul.append($li)
          await randwords($b)
        }
      } else {
        $para.append('. ')
      }
    }
  }

  // enable
  $('#input textarea').prop('disabled', false)
}


$(document).ready(() => {

  $('#input textarea').on('keydown', (e) => {
    if (e.which == 13) {
      let prompt = e.target.value
      e.target.value = ''
      answer(prompt)
      return false
    }
  })

  $('.example').on('click', (e) => {
    answer(e.target.innerText)
  })

})
