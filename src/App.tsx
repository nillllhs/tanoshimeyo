import { useState } from 'react'
import './App.css'
import { Button, TextField, Heading } from '@radix-ui/themes'
import html2canvas from 'html2canvas'

type LineCommentProps = {
  text: string,
  time: string
}

function LineComment ({ text, time }: LineCommentProps) {
  return (
    <div className='linecomment'>
      <div className='linecommentframe'>
        <div className='linecommenttext'>{text}</div>
      </div>
      <div className='linetime'>{time}</div>
    </div>
  )
}

function createLineElement(...lineComments: HTMLElement[]) {
  const root = document.createElement('div');
  root.style.display = 'flex';

  const lineRoot = document.createElement('div');
  lineRoot.classList.add('lineroot');

  for(const commentElement of lineComments) {
    lineRoot.appendChild(commentElement);
  }

  const margin = document.createElement('div');
  margin.style.flexGrow = '1';

  root.appendChild(lineRoot);
  root.appendChild(margin);

  return root;
}

function createLineCommentElement(text: string, time: string) {
  const lineComment = document.createElement('div');
  lineComment.classList.add('linecomment');

  const lineCommentFrame = document.createElement('div');
  lineCommentFrame.classList.add('linecommentframe');

  const lineCommentText = document.createElement('div');
  lineCommentText.classList.add('linecommenttext');
  lineCommentText.textContent = text;

  const lineTime = document.createElement('div');
  lineTime.classList.add('linetime');
  lineTime.textContent = time;
  
  lineCommentFrame.appendChild(lineCommentText);
  lineComment.appendChild(lineCommentFrame);
  lineComment.appendChild(lineTime);

  return lineComment;
}

function App() {
  const [name, setName] = useState('かほ')
  const time = '15:47'

  function createImage() {
    const comment1 = createLineCommentElement('まあ', time);
    const comment2 = createLineCommentElement(`せいぜい${name}ちゃんとたのしめよ`, time);

    const target = createLineElement(comment1, comment2);

   
    const root = document.querySelector('#root') as HTMLElement;
    root.appendChild(target)

    const lineElement = target.getElementsByClassName('lineroot')[0] as HTMLElement;
    
    html2canvas(lineElement)
    .then(canvas => {
      console.log(canvas)
      const link = document.createElement('a')
      link.href = canvas.toDataURL()
      link.download = `せいぜい${name}ちゃんとたのしめよ.png`
      link.click()
      root.removeChild(target);
    })
  }

  return (
    <>
      <div>
        <Heading className='title' as='h1'>せいぜいたのしめよジェネレーター</Heading>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
          <TextField.Root>
            <TextField.Input placeholder='たのしむひと' value={name} onChange={e => setName(e.target.value)}/>
          </TextField.Root>
          <Button onClick={createImage}>
            画像生成
          </Button>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div className='lineroot'>
          <LineComment text='まあ' time={time} />
          <LineComment text={`せいぜい${name}ちゃんとたのしめよ`} time={time} />
        </div>
        <div style={{flexGrow: 1}}></div>
      </div>
      
    </>
  )
}

export default App
