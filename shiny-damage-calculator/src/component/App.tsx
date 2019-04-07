import * as React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { LOCAL_KEY, reduce } from '../reducer';
import { DEFAULT_STATE, IAction, IAppState } from '../state';
import DamageResult from './DamageResult';
import { IdolParameterForm } from './IdolParameterForm';
import { OtherOptionForm } from './OtherOptionForm';

interface IContext {
  state: IAppState
  dispatch: (action: IAction) => void
}

const defaultState: IAppState = window.localStorage.getItem(LOCAL_KEY) === null
  ? DEFAULT_STATE : JSON.parse('' + window.localStorage.getItem(LOCAL_KEY));

// tslint:disable-next-line: no-empty
export const AppContext = React.createContext<IContext>({'state': defaultState, dispatch: () => {}});

const App: React.FC = () => {
  const [state, setState] = React.useState<IAppState>(defaultState);

  return (
    <AppContext.Provider value={{'state': state, dispatch: (action: IAction) => reduce(state, setState, action)}}>
      <Row>
        <Col className='mx-auto' xs={12} sm={8} md={6}>
          <h3 className='text-center d-none d-sm-block my-2'>샤니마스 어필계산기</h3>
          <h4 className='text-center d-xs-block d-sm-none my-2'>샤니마스 어필계산기</h4>
          <div className='text-center my-2'>
            Ver.0.6.0
            <a className='ml-2' href='https://github.com/YSRKEN/shiny_damage_calculator'>GitHubへのリンク</a>
            <a className='ml-2' href='https://twitter.com/YSRKEN'>作者Twitter</a>
          </div>
          <div className='text-center'>
          	+Ver 0.1 
            <a className='ml-1' href='https://shiny-calc-kor.firebaseapp.com'>한글화 및 기능추가 : 유동</a>
          </div>
          <p className='text-center my-1'>
            주의 : 본 계산식은 오차가 있을 수 있습니다.
          </p>
          <Form className='border'>
            <IdolParameterForm/>
            <OtherOptionForm/>
          </Form>
          <div className='border'>
            <DamageResult/>
          </div>
        </Col>
      </Row>
    </AppContext.Provider>
  );
}

export default App;
