//@flow

import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const styles = {
  copy: {
    backgroundColor: '#5caaf6',
    cursor: 'pointer',
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    color: '#fff',
  },
};

type RendererProps = {
  field: {
    value: string,
  },
};

export const DescriptionRenderer = ({
  field,
}: RendererProps): React$Element<any> => <textarea {...field} />;

export const PasswordRenderer = ({
  field,
}: RendererProps): React$Element<any> => (
  <div>
    <input {...field} type="password" />
    <CopyToClipboard text={field.value}>
      <span style={styles.copy}>Copiar</span>
    </CopyToClipboard>
  </div>
);
