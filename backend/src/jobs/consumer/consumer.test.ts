import { consumer } from './consumer';

describe('Testando a função consumer', () => {
  let scheduleJobMock: jest.Mock;

  beforeEach(() => {
    scheduleJobMock = jest.fn();
    jest.clearAllMocks();
  });

  it('deve agendar uma tarefa para rodar às 00:00 no horário de Brasília', () => {
    consumer(scheduleJobMock);
    expect(scheduleJobMock).toHaveBeenCalledWith(
      '0 0 * * *', 
      expect.any(Function)
    );
  });

  it('deve chamar o console.log quando a função agendada é executada', () => {
    const logSpy = jest.spyOn(console, 'log');
    scheduleJobMock.mockImplementation((_, callback) => {
      callback();
    });
    consumer(scheduleJobMock);
    expect(logSpy).toHaveBeenCalledWith(
      'Executando a tarefa às 00:00 no horário de Brasília!',
      expect.any(String)
    );
    logSpy.mockRestore();
  });
});
