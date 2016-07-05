package org.CustomerService.rest;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;

@Path("/customers")
public class CutomerEndpoint {

	@GET
	@Produces("application/json")
	public List<String> getProspects() {
		ArrayList<String> prospects = new ArrayList<String>();
		prospects.add("Kyle");
		prospects.add("John");
		prospects.add("Sarah");
		return prospects;
	}
}