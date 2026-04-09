import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, business, tools, websiteUrl, agentName } = body

    if (!name || !agentName) {
      return NextResponse.json(
        { error: 'Missing required fields: name and agentName' },
        { status: 400 }
      )
    }

    // Fetch website content (simplified)
    let websiteContent = ''
    let websiteTitle = ''
    let websiteDescription = ''

    if (websiteUrl) {
      try {
        const response = await fetch(websiteUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; ClawOpsBot/1.0)'
          }
        })

        const html = await response.text()

        // Simple extraction
        const titleMatch = html.match(/<title>(.*?)<\/title>/i)
        websiteTitle = titleMatch ? titleMatch[1] : ''

        const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i)
        websiteDescription = descriptionMatch ? descriptionMatch[1] : ''
      } catch (err) {
        console.log('Could not fetch website:', websiteUrl)
      }
    }

    // Analyze user inputs and create agent personality
    const personality = `You are ${agentName}, an AI assistant specialized for ${name}.

Business: ${business || 'Not specified'}
Tools you use: ${tools || 'Not specified'}

Your role is to help the user with tasks related to their business, using their preferred tools and automations. You have access to:
- Custom CLI tools
- Browser automation (Chrome VNC)
- n8n workflows
- Firecrawl web scraping
- Go High Level integration
- Multiple AI models (Gemma 4 2B as default)`

    const purpose = `As ${agentName}, your purpose is to:
1. Automate repetitive tasks for the user
2. Help them use their tools more efficiently
3. Answer questions about their business
4. Execute tasks using browser automation and CLIs
5. Use workflows to streamline operations

When the user mentions ${websiteTitle || 'their business'}, use that information to provide personalized assistance.`

    const memory = `User Information:
- Name: ${name}
- Business: ${business || 'Not specified'}
- Website: ${websiteUrl || 'Not provided'}
- Tools: ${tools || 'Not specified'}
- Agent Name: ${agentName}

Key Business Information:
- Primary Focus: ${business ? business.split(',')[0].trim() : 'General'}
- Tech Stack: ${tools || 'Not specified'}

Agent Personality:
- Friendly and professional
- Efficient and organized
- Knowledgeable about automation tools
- Focus on getting things done

Agent's Goals:
1. Help user automate daily tasks
2. Respond to inquiries quickly
3. Execute complex operations with available tools
4. Learn from interactions to improve`

    // Create identity file content
    const identity = `# ${name} - Business Identity

## Business Overview
${business || 'No business information provided.'}

## Website
${websiteUrl || 'No website provided.'}

## Key Details
- Agent Name: ${agentName}
- Created: ${new Date().toISOString()}

## Tech Stack
${tools || 'Not specified'}

## Notes
This file contains the core business identity for ${name}. The AI agent uses this information to provide personalized assistance.
    `
    
    // Return the analysis results
    return NextResponse.json({
      success: true,
      personality,
      purpose,
      memory,
      identity,
      websiteTitle,
      websiteDescription
    })
  } catch (error) {
    console.error('Agent analyze error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}