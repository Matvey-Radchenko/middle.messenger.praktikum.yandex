/* eslint-disable @typescript-eslint/no-explicit-any */
// Этого требует typescript для конструирования классов mixin'ов в декораторах
import { Block } from '../block';

export type BlockConstructor<P extends Indexed = Indexed> = new (
    ...args: any[]
) => Block<P>;
