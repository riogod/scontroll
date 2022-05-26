import { container } from 'tsyringe';

export default function useContainer<T>(classInstanse: any): T {
  if (!container.isRegistered(classInstanse)) {
    throw Error('View model does not bound in container!');
  }

  return container.resolve<T>(classInstanse);
}
