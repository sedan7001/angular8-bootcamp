package com.logpresso.bootcamp.parser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Locale;
import java.util.Map;

import org.apache.felix.ipojo.annotations.Component;
import org.apache.felix.ipojo.annotations.Provides;
import org.araqne.log.api.AbstractLogParserFactory;
import org.araqne.log.api.LogParser;

@Component(name = "logpresso-splunk-github-event-parser-factory")
@Provides
public class SplunkGithubEventParserFactory extends AbstractLogParserFactory {

	@Override
	public String getName() {
		return "splunk-github-event";
	}

	@Override
	public Collection<Locale> getDisplayNameLocales() {
		return Arrays.asList(Locale.ENGLISH, Locale.KOREAN);
	}

	@Override
	public String getDisplayName(Locale locale) {
		if(locale != null && locale.equals(Locale.KOREAN))
			return "스플렁크 깃헙 이벤트";
		return "Splunk Github Event";
	}

	@Override
	public Collection<Locale> getDescriptionLocales() {
		return Arrays.asList(Locale.ENGLISH, Locale.KOREAN);
	}

	@Override
	public String getDescription(Locale locale) {
		if (locale != null && locale.equals(Locale.KOREAN))
			return "Splunk 깃헙 이벤트 로그를 파싱합니다.";
		return "Parse Splunk github event logs.";
	}

	@Override
	public String getDisplayGroup(Locale locale) {
		if (locale != null && locale.equals(Locale.KOREAN))
			return "부트캠프";
		return "Bootcamp";
	}

	@Override
	public LogParser createParser(Map<String, String> configs) {
		return new SplunkGithubEventParser();
	}

}
