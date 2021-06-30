import { EventHandler, memo, useState } from 'react';
import BraftEditor, { ControlType } from 'braft-editor';
import 'braft-editor/dist/index.css';

interface IPorp {
  value: any;
  onChange: EventHandler<any>;
}

const style: React.CSSProperties = {
  position: 'relative',
  height: '380px',
  border: '1px solid #ccc',
  overflow: "hidden"
};

const RichText = (props: Partial<IPorp>) => {
  const { value, onChange } = props;
  const [editorState, setEditorState] = useState(
    value ? BraftEditor.createEditorState(value) : null,
  );
  const handleChange = (editorState: any) => {
    setEditorState(editorState);
    onChange && onChange(editorState.toHTML(editorState));
  };

  const controls: ControlType[] = [
    'bold',
    'italic',
    'underline',
    'text-color',
    'list-ul',
    'list-ol',
    'separator',
    'link',
  ];

  return (
    <div style={style}>
      <BraftEditor
        value={editorState}
        onChange={handleChange}
        controls={controls}
      />
    </div>
  );
};

export default memo(RichText);
