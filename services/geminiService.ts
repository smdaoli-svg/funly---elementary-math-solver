import { MathProblemResult, MathStep } from "../types";

const QWEN_API_KEY = 'sk-b58ad18245ed452a9b658cd82c532b78';

export async function analyzeMathProblem(base64Image: string): Promise<MathProblemResult> {
  const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${QWEN_API_KEY}`
    },
    body: JSON.stringify({
      model: 'qwen-vl-plus',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:image/png;base64,${base64Image}` }
            },
            {
              type: 'text',
              text: `Extract the math problem text from this image and break it down into exactly 3 steps for an elementary school student.
          
          Rule for Steps:
          Step 1: Abstract to Concrete. Convert numbers to blocks, units, or physical objects.
          Step 2: Gamify. Create a simple game or scenario with characters using the concrete objects from Step 1.
          Step 3: Pattern & Answer. Use the visuals to find the pattern and reveal the answer.

          For each step, provide a highly descriptive prompt for an AI image generator. 
          The style must be: "Playful children's flat illustration, vibrant colors, soft lighting, consistent cute character named 'Momo the Monkey', white background."
          
          Return the result in valid JSON format with this structure:
          {
            "originalText": "the math problem text",
            "steps": [
              {
                "stepNumber": 1,
                "description": "step description",
                "imagePrompt": "AI image prompt for this step"
              }
            ]
          }`
            }
          ]
        }
      ],
      max_tokens: 2000
    })
  });

  const data = await response.json();
  const textContent = data.choices?.[0]?.message?.content || '';
  
  const jsonMatch = textContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const result = JSON.parse(jsonMatch[0]) as MathProblemResult;
    return result;
  }
  
  return {
    originalText: textContent,
    steps: []
  };
}

export async function generateStepImage(prompt: string): Promise<string> {
  const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${QWEN_API_KEY}`
    },
    body: JSON.stringify({
      model: 'wanx2.1',
      prompt: prompt,
      size: '1024x1024',
      n: 1
    })
  });

  const data = await response.json();
  if (data.data && data.data[0] && data.data[0].url) {
    return data.data[0].url;
  }
  
  return '';
}
