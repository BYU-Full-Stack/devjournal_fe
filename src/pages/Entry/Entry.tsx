import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from './../../Styles';
import { getJournals, useUser } from '../../API/AppLogic';
import { RouteMatchType } from '../../Types';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

export type EntryType = {
  markdown: string | undefined;
};

const Entry = (props: EntryType) => {
  const [seeMarkdown, setSeeMarkdown] = useState(false);
  return (
    <>
      <button onClick={() => setSeeMarkdown(!seeMarkdown)}>switch</button>
      {seeMarkdown === false ? (
        <>
          <button>save</button>
          <button>preview</button>
          <button>discard</button>
          <Editor
            height='90vh'
            defaultLanguage='markdown'
            defaultValue={props.markdown}
            theme='vs-dark'
          />
        </>
      ) : (
        <>
          <button>edit</button>
          <ReactMarkdown
            source={typeof props.markdown === 'string' ? props.markdown : ''}
          />
        </>
      )}
    </>
  );
};

export default Entry;
