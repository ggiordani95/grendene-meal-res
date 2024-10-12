import { DateTime } from 'luxon';
import schedule from 'node-schedule';

export function consumer(scheduleJob = schedule.scheduleJob) {
  scheduleJob('0 0 * * *', function() {
    const currentTime = DateTime.now().setZone('America/Sao_Paulo').toISO();
    console.log('Executando a tarefa às 00:00 no horário de Brasília!', currentTime);
  });
}
