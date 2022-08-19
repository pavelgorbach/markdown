import { ChangeEvent, useState } from 'react' 
import { Stack, Button, Container, Collapse, Row, Col, Toast, Form } from 'react-bootstrap' 
import { marked } from 'marked'
import DOMPurify from 'dompurify'

import gitHubLogo from './GitHub_Logo.png'
import styles from './App.module.css'
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
      <Container fluid className="p-3 bg-light">
        <Stack direction='horizontal' gap={2}>
          <h1 className="ms-auto">Markdown Previewer</h1>
          <Button variant="light">
            <a href="https://github.com/pavelgorbach/markdown" target="blank" rel="noopener noreferrer">
              <img src={gitHubLogo} className={styles.githubLogo} alt="GitHub" />
            </a>
          </Button>
        </Stack>

        <Row xs={1} md={visible === 'all' ? 2 : 1} className={styles.row}>
          <Collapse in={visible !== 'preview'}>
            <Col>
              <Toast className="d-flex flex-column h-100 w-auto">
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">Editor</strong>
                  <i
                    className={`ms-auto fa ${visible === 'all' ? "fa-expand" : "fa-compress"}`}
                    onClick={() => setVisible(visible === 'all' ? 'editor' : 'all')}
                  />
                </Toast.Header>
                <Toast.Body className="p-0 d-flex flex-grow-1">
                  <Form.Control
                    as="textarea"
                    onChange={onChangeText}
                    value={text}
                    className={[styles.textArea, 'border-0'].join(' ')}
                    id="editor"
                  />
                </Toast.Body>
              </Toast>
            </Col>
          </Collapse>

          <Collapse in={visible !== 'editor'}>
            <Col>
              <Toast className="w-auto">
                <Toast.Header closeButton={false}>
                  <strong className="me-auto">Previewer</strong>
                  <i
                    className={`ms-auto fa ${visible === 'all' ? "fa-expand" : "fa-compress"}`}
                    onClick={() => setVisible(visible === 'all' ? 'preview' : 'all')}
                  />
                </Toast.Header>
                <Toast.Body>
                  <div id="preview" dangerouslySetInnerHTML={{ __html: parsedText }}/>
                </Toast.Body>
              </Toast>
            </Col>
          </Collapse>
        </Row>
      </Container>
    </div>
  )
}