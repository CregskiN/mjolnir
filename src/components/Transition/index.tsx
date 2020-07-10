import { FC } from 'react';
import Transition, { TransitionProps } from './transition';

export type ITransitionComponent = FC<TransitionProps>;

const TransTransition = Transition as ITransitionComponent;

export default TransTransition;