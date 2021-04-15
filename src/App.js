import React from 'react';
import Layout from './layout/layout';
import Game from './components/Game/Game';
import * as S from './App.style';

function App() {
  return (
    <Layout>
      <S.Site>
        <Game />
      </S.Site>
    </Layout>
  );
}

export default App;
