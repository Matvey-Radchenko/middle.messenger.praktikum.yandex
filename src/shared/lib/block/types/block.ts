import { Block } from '../block';

export type BlockConstructor = new (props?: Indexed) => Block<Indexed>;
