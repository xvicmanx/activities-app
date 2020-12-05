import React from 'react';
import { Loader } from 'react-bulma-components';

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    width: 'fit-content',
    margin: '20px auto',
    color: '#5caaf6',
    lineHeight: '1.6',
    border: '1px solid #efefef',
  },
  loader: {
    border: '3px solid #5caaf6',
    width: '50px',
    height: '50px',
    display: 'block',
    margin: 'auto',
  },
};

const LoadingIndicator = () => (
  <div style={styles.container}>
    <Loader style={styles.loader} />
    Cargando ...
  </div>
);

export default LoadingIndicator;
