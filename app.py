from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from src.website_generator.crew import WebsiteGenerator

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session handling

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for the web app
@app.route('/tool')
def tool():
    return render_template('tool.html')

# Route for the admin pages (Privacy Policy)
# In the future, I am planning to move this into an "admin" directory for easier organization
@app.route('/privacy_policy')
def privacy_policy():
    return render_template('privacy_policy.html')

@app.route('/terms_of_use')
def terms_of_use():
    return render_template('terms_of_use.html')

# API Endpoint for quiz submission

@app.route('/api/submitQuiz', methods=['POST'])
def submit_quiz():
    # Default portfolio builder
    layout = "one pager"
    purpose = "Build a portfolio based on the resume provided."

    # Get user input from the quiz form
    data = request.json
    name = data.get('name')
    theme = data.get('theme')
    color = data.get('color')
    content = data.get('content')
    resume = data.get('resume')

    # Default values if none are provided.
    if not name: 
        name = "John Doe"
    if not theme: 
        theme = "Simple, modern, and elegant"
    if not color: 
        color = "Use a combination of light colors"
    if not content: 
        content = "A portfolio with 5 sections: HERO section (with image), about me, my work, my education, and contact information"
    if not resume: 
        resume = "None attached. Assume I am a college student"

    # Define the inputs to pass to CrewAI model
    inputs = {
        'name' : name,
        'purpose': purpose,
        'theme': theme,
        'color': color,
        'layout': layout,
        'content': content,
        'resume' : resume
    }

    # Run the CrewAI model with the inputs
    website_generator = WebsiteGenerator()
    result = website_generator.crew().kickoff(inputs=inputs)

    # Extract the HTML string from the result (assuming result.result holds the HTML)
    html_output = result.result if hasattr(result, 'result') else str(result)

    # Remove unwanted Markdown-style markers
    html_output = html_output.strip('```html').strip('```').strip()

    print(f"HTML OUTPUT: {html_output}")

    # Store the generated HTML in the session
    session['generated_html'] = html_output

    # Redirect to a new route to display the HTML
    return redirect(url_for('display_website'))

# Route to display the generated website
@app.route('/website')
def display_website():
    # Get the generated HTML from the session
    html_output = session.get('generated_html')
    css_input = html_output
    return render_template('website/website.html', html_content=html_output)

# WIP
def display_css():
    # Get the generated CSS from the session
    css_output = session.get('generated_html')

# WIP
def clean_css():
    """
    Cleans the /templates/website/css/styles.css file by removing all occurrences of '```'.
    """
    with open("/templates/website/css/styles.css", "r+") as file:
        content = file.read()
        cleaned_content = content.replace("```", "")
        file.seek(0)  # Move to the start of the file
        file.write(cleaned_content)
        file.truncate()  # Truncate the file to the current size (in case the new content is shorter)

# WIP
def clean_js():
    """
    Cleans the /templates/website/js/script.js file by removing all occurrences of '```'.
    """
    with open("/templates/website/js/script.js", "r+") as file:
        content = file.read()
        cleaned_content = content.replace("```", "")
        file.seek(0)  # Move to the start of the file
        file.write(cleaned_content)
        file.truncate()  # Truncate the file to the current size (in case the new content is shorter)

if __name__ == '__main__':
    app.run(debug=True)