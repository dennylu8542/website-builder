from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task, before_kickoff, after_kickoff
from crewai_tools import SerperDevTool, ScrapeWebsiteTool

# Uncomment the following line to use an example of a custom tool
# from website_generator.tools.custom_tool import MyCustomTool

# Check our tools documentations for more information on how to use them
# from crewai_tools import SerperDevTool

@CrewBase
class WebsiteGenerator():
	"""WebsiteGenerator crew"""

	agents_config = 'config/agents.yaml'
	tasks_config = 'config/tasks.yaml'

	@before_kickoff # Optional hook to be executed before the crew starts
	def pull_data_example(self, inputs):
		# Example of pulling data from an external API, dynamically changing the inputs
		inputs['extra_data'] = "This is extra data"
		return inputs

	@after_kickoff # Optional hook to be executed after the crew has finished
	def log_results(self, output):
		# Example of logging results, dynamically changing the output
		# print(f"Results: {output}")
		return output

	@agent
	def html_generator(self) -> Agent:
		return Agent(
			config=self.agents_config['html_generator'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
			# tools=[SerperDevTool(), ScrapeWebsiteTool()],
			verbose=True
		)
	
	@agent
	def css_generator(self) -> Agent:
		return Agent(
			config=self.agents_config['css_generator'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
			verbose=True
		)
	
	@agent
	def javascript_generator(self) -> Agent:
		return Agent(
			config=self.agents_config['javascript_generator'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
			verbose=True
		)

	@task
	def html_generation_task(self) -> Task:
		return Task(
			config=self.tasks_config['html_generation_task'],
			output_file='/templates/website/website.html',
			mode='a'
		)
	
	@task
	def css_generation_task(self) -> Task:
		return Task(
			config=self.tasks_config['css_generation_task'],
			output_file='/templates/website/css/styles.css',
			mode='a'
		)
	
	@task
	def javascript_generation_task(self) -> Task:
		return Task(
			config=self.tasks_config['javascript_generation_task'],
			output_file='/templates/website/js/script.js',
			mode='a'
		)

	@crew
	def crew(self) -> Crew:
		"""Creates the WebsiteGenerator crew"""
		return Crew(
			agents=self.agents, # Automatically created by the @agent decorator
			tasks=self.tasks, # Automatically created by the @task decorator
			process=Process.sequential,
			verbose=True,
			# process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
		)
