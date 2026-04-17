import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, business, tools, websiteUrl, agentName } = body

    if (!name || !agentName) {
      return NextResponse.json(
        { error: 'Missing required fields: name and agentName' },
        { status: 400 }
      )
    }

    // Fetch website content if provided
    let websiteTitle = ''
    let websiteDescription = ''

    if (websiteUrl) {
      try {
        const response = await fetch(websiteUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ClawOpsBot/1.0)' }
        })
        const html = await response.text()
        const titleMatch = html.match(/<title>(.*?)<\/title>/i)
        websiteTitle = titleMatch ? titleMatch[1] : ''
        const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i)
        websiteDescription = descriptionMatch ? descriptionMatch[1] : ''
      } catch {
        // Ignore website fetch errors
      }
    }

    // Generate agent personality based on inputs
    const personality = `You are ${agentName}, an AI assistant for ${name}.

Business: ${business || 'Not specified'}
Tools: ${tools || 'Not specified'}

Role: Help with business automation, using available tools including:
- Browser automation (Chrome VNC)
- n8n workflows
- CLI tools
- Web scraping`

    const purpose = `As ${agentName}, your purpose is to:
1. Automate repetitive tasks
2. Help use tools efficiently
3. Execute tasks using browser automation and CLIs
4. Use workflows to streamline operations`

    const memory = `User Information:
- Name: ${name}
- Business: ${business || 'Not specified'}
- Website: ${websiteUrl || 'Not provided'}
- Tools: ${tools || 'Not specified'}
- Agent Name: ${agentName}

Business Focus: ${business ? business.split(',')[0].trim() : 'General'}
Tech Stack: ${tools || 'Not specified'}`

    return NextResponse.json({
      success: true,
      personality,
      purpose,
      memory,
      websiteTitle,
      websiteDescription,
    })
  } catch (error: any) {
    console.error('Agent analyze error:', error)
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 })
  }
}
