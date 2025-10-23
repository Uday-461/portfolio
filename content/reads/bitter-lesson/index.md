---
title: 'The Bitter Lesson'
subtitle: "Why Computation and Search Ultimately Trump Human-Crafted Solutions"
author: "Rich Sutton"
date: '2019-03-13'
read_date: '2023-06-15'
source_type: "essay"
source_url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
categories:
  - AI
  - Machine Learning
  - Philosophy
tags:
  - AI
  - MachineLearning
  - Philosophy
  - Research
  - Learning
---

![](https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop)

A foundational essay by Rich Sutton on why the most effective AI methods ultimately leverage computation and search rather than human-crafted knowledge.

## Key Insights

### The Core Thesis
> "The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin."

### Historical Pattern
Sutton demonstrates how repeatedly, AI advances have favored approaches that scale with computation over approaches that rely on human knowledge:

1. **Computer Chess**: Human-crafted evaluation functions → Deep learning search
2. **Computer Go**: Human rules and patterns → Monte Carlo tree search + neural networks
3. **Speech Recognition**: Linguistic models → End-to-end deep learning
4. **Computer Vision**: Feature engineering → Convolutional neural networks

### Why This Matters

**For AI Engineers:**
- Focus on methods that scale with compute
- Don't underestimate the power of search and learning
- Human knowledge is a starting point, not the end goal

**For Product Builders:**
- Build systems that can learn and improve
- Leverage growing computational resources
- Don't over-engineer solutions based on current understanding

## Critical Reflections

### What I Found Challenging
At first, this thesis seems to dismiss the value of human expertise entirely. But Sutton isn't arguing against human insight-he's arguing against approaches that don't scale.

### The Nuance Missing
The bitter lesson doesn't mean human expertise is worthless. It means human expertise that doesn't scale is limited. The sweet spot is often human-guided search that leverages computation.

### Modern Implications
This lesson is more relevant than ever with:
- **Large Language Models**: Scale and data trump linguistic rules
- **Foundation Models**: General methods beat specialized approaches
- **Compute-as-a-Service**: Scaling computation is increasingly accessible

## Practical Takeaways

### For My Work
1. **RAG Systems**: Use search + generation rather than rule-based systems
2. **Automation**: Build learning systems, not fixed workflows
3. **Platform Design**: Prioritize scalable architectures

### For Future Planning
- Invest in compute and data infrastructure
- Build systems that can learn from experience
- Design for scaling, not for immediate optimization

## Quotes Worth Remembering

> "General methods that leverage computation are ultimately the most effective, and by a large margin."

> "The bitter lesson is based on the historical observations that 1) AI researchers have often tried to build systems that work the way people think, and 2) that these efforts have ultimately not been the ones that led to major breakthroughs."

> "Thought is utterly overrated."

## Connection to Current Work

This essay fundamentally changed how I think about building AI systems:

- **Before**: Optimize for current performance with human-crafted rules
- **After**: Build systems that can learn and scale with computation

It's why I moved from rule-based systems to learning-based approaches in my RAG and automation work.

## Why You Should Read This

**Read this if you're:**
- Building AI systems or products
- Debating between rule-based vs. learning-based approaches
- Planning long-term technical strategy
- Interested in the philosophy of AI progress

**Skip this if you're:**
- Looking for specific implementation details
- Want immediate tactical advice
- Prefer practical guides over philosophical essays

---

**My Rating**: ⭐⭐⭐⭐⭐ (Essential reading for AI builders)

**Time Investment**: 15 minutes

**Re-read Frequency**: Every 6 months