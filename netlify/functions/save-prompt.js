/**
 * Netlify function to save user prompts
 * 
 * This function handles saving basic and enhanced prompts.
 * In a production environment, this would typically connect to a database.
 * 
 * @param {Object} event - The Netlify event object
 * @param {Object} context - The Netlify context object
 * @returns {Object} HTTP response
 */
exports.handler = async function(event, context) {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }
  
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        error: "Method not allowed",
        message: "This endpoint only accepts POST requests"
      })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { basicPrompt, enhancedPrompt } = data;

    // Validate the data
    if (!basicPrompt || !enhancedPrompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: "Missing required fields",
          message: "Both basicPrompt and enhancedPrompt are required"
        })
      };
    }

    // Basic validation for prompt content
    if (basicPrompt.length > 1000 || enhancedPrompt.length > 5000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: "Content too large",
          message: "Prompts exceed maximum allowed length"
        })
      };
    }

    // Here you could save the data to a database
    // For now, we'll just return a success response with the data
    
    // Log the saved prompt (would be database insertion in production)
    console.log("Saved prompt:", {
      basicPrompt,
      enhancedPrompt,
      timestamp: new Date().toISOString(),
      userId: context.clientContext?.user?.sub || 'anonymous'
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: "Prompt saved successfully",
        data: { 
          basicPrompt, 
          enhancedPrompt,
          timestamp: new Date().toISOString()
        }
      })
    };
  } catch (error) {
    console.error("Error saving prompt:", error);
    
    // Determine if it's a parsing error
    const isParsingError = error instanceof SyntaxError && 
                          error.message.includes('JSON');
    
    return {
      statusCode: isParsingError ? 400 : 500,
      headers,
      body: JSON.stringify({ 
        error: isParsingError ? "Invalid JSON" : "Server error",
        message: isParsingError 
          ? "Could not parse request body as JSON" 
          : "Failed to save prompt. Please try again later."
      })
    };
  }
};