
// const TIMEZONE = 'Europe/Copenhagen';ZonedDateTime.now().toString()

import { ZonedDateTime, ZoneId, DateTimeFormatter } from 'js-joda';

import {formatCreatedAt, TIMEZONE} from 'app/helpers/time';

describe('Time helpers', () => {

  it('should print time in format HH:mm if provided dateTime is today', () => {
    const nowZoneDateTime = ZonedDateTime.now().toString();
    const testValue = ZonedDateTime.parse(nowZoneDateTime).withZoneSameInstant(ZoneId.of(TIMEZONE));

    const expected = testValue.format(DateTimeFormatter.ofPattern('HH:mm'));
    const result = formatCreatedAt(nowZoneDateTime);

    expect(expected).toBe(result);
  });

  it('should print time in format d/M/yyyy HH:mm if provided dateTime is in different year', () => {
    const nextYearZoneDateTime = ZonedDateTime.now().plusYears(1).toString();
    const testValue = ZonedDateTime.parse(nextYearZoneDateTime).withZoneSameInstant(ZoneId.of(TIMEZONE));

    const expected = testValue.format(DateTimeFormatter.ofPattern('d/M/yyyy HH:mm'));
    const result = formatCreatedAt(nextYearZoneDateTime);

    expect(expected).toBe(result);
  });

  it('should print time in format d/M HH:mm if provided dateTime is in the same year and not today', () => {
    const thisYearZoneDateTime = ZonedDateTime.now().plusDays(5).toString();
    const testValue = ZonedDateTime.parse(thisYearZoneDateTime).withZoneSameInstant(ZoneId.of(TIMEZONE));

    const expected = testValue.format(DateTimeFormatter.ofPattern('d/M HH:mm'));
    const result = formatCreatedAt(thisYearZoneDateTime);

    expect(expected).toBe(result);
  });

});
