import { ChangeEvent, useState } from 'react' 
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import GitHub from './GitHub_Logo.png'

import styles from './App.module.scss'
import { defaultText } from './constants'

marked.setOptions({
  breaks: true
});

type VisibilityStatus = 'editor' | 'preview' | 'all'

export default function App() {
  const [text, setText] = useState(defaultText)
  const parsedText = DOMPurify.sanitize(marked.parse(text))

  const onChangeText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const [visible, setVisible] = useState<VisibilityStatus>('all')
  
  return (
    <div className={styles.container}>
       <header className={styles.header}>
         <a className={styles.githubButton} href="https://github.com/pavelgorbach/markdown" target="blank">
           <img src={GitHub} alt="GitHub" />  
         </a>
         <h1>Markdown Previewer</h1>
       </header>

      <main className={[styles.main, visible === 'all' ? styles.twoColumns : styles.onColumn].join(' ')}>
        {visible !== 'preview' && (
          <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
              <strong>Editor</strong>
              <i
                role="button"
                className={`fa ${visible === 'all' ? "fa-expand" : "fa-compress"}`}
                onClick={() => setVisible(visible === 'all' ? 'editor' : 'all')}
              />
            </div>
            <textarea
              className={styles.textarea}
              onChange={onChangeText}
              value={text}
              id="editor"
            />
          </div>
        )}

        {visible !== 'editor' && (
          <div>
            <div className={styles.editorHeader}>
              <strong>Previewer</strong>
              <i
                role="button"
                className={`fa ${visible === 'all' ? "fa-expand" : "fa-compress"}`}
                onClick={() => setVisible(visible === 'all' ? 'preview' : 'all')}
              />
            </div>
            <div id="preview" dangerouslySetInnerHTML={{ __html: parsedText }}/>
          </div>
        )}
      </main>
    </div>
  )
}