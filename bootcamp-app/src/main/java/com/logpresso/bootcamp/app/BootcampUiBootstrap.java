package com.logpresso.bootcamp.app;

import org.apache.felix.ipojo.annotations.Component;
import org.apache.felix.ipojo.annotations.Invalidate;
import org.apache.felix.ipojo.annotations.Requires;
import org.apache.felix.ipojo.annotations.Validate;
import org.araqne.httpd.HttpContext;
import org.araqne.httpd.HttpContextRegistry;
import org.araqne.httpd.HttpService;
import org.araqne.msgbus.MessageBus;
import org.araqne.webconsole.WebConsole;
import org.osgi.framework.BundleContext;

@Component(name = "logpresso-bootcamp-ui-bootstrap")
public class BootcampUiBootstrap {
	private BundleContext bc;

	@Requires
	private HttpService httpd;

	@Requires
	private MessageBus msgbus;

	@Requires
	private WebConsole webconsole;

	public BootcampUiBootstrap(BundleContext bc) {
		this.bc = bc;
	}

	@Validate
	public void start() {
		HttpContextRegistry contextRegistry = httpd.getContextRegistry();
		HttpContext ctx = contextRegistry.ensureContext("bootcamp");
		ctx.addServlet("bootcamp", new BootcampWebServlet(bc.getBundle(), "/WEB-INF"), "/*");
		webconsole.bindMessageBus(ctx);
	}

	@Invalidate
	public void stop() {
		if (httpd != null) {
			HttpContextRegistry contextRegistry = httpd.getContextRegistry();
			HttpContext ctx = contextRegistry.ensureContext("bootcamp");
			ctx.removeServlet("bootcamp");
			if (webconsole != null)
				webconsole.unbindMessageBus(ctx);
		}
	}

}
