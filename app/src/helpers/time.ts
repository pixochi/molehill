import { ZonedDateTime, ZoneId, ChronoUnit, DateTimeFormatter } from 'js-joda';

export const TIMEZONE = 'UTC+1';

export const formatCreatedAt = (createdAt: string) => {
  const createdAtDateTime = ZonedDateTime.parse(createdAt).withZoneSameInstant(ZoneId.of(TIMEZONE));
  const now = ZonedDateTime.now(ZoneId.of(TIMEZONE));

  const dayDiff = createdAtDateTime.until(now, ChronoUnit.DAYS);
  let formatterPattern: string;

  if (dayDiff === 0) {
    formatterPattern = 'HH:mm';
  }
  else if (createdAtDateTime.year() !== now.year()) {
    formatterPattern = 'd/M/yyyy HH:mm';
  }
  else {
    formatterPattern = 'd/M HH:mm';
  }

  return createdAtDateTime.format(DateTimeFormatter.ofPattern(formatterPattern));
};
