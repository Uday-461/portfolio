---
title: 'Situated Cognition'
subtitle: "Why knowledge is fundamentally tied to context and activity"
author: "Brown, Collins & Duguid"
date: '1989-01-01'
read_date: '2023-08-10'
source_type: "academic paper"
source_url: "https://doi.org/10.1207/s1532690epi0201_1"
categories:
  - Cognition
  - Learning
  - Education
tags:
  - Cognition
  - Learning
  - Context
  - Education
  - Psychology
---

![](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop)

A landmark paper on how learning and knowing are fundamentally tied to context and activity. Crucial for understanding the limitations of decontextualized AI systems.

## The Core Argument

Traditional views treat knowledge as:
- **Abstract**: Independent of context
- **Transferable**: Easily applied across situations
- **Individual**: Existing in individual minds

Situated cognition argues that knowledge is:
- **Embodied**: Tied to physical experience
- **Contextual**: Meaningful only in specific contexts
- **Social**: Constructed through interaction

## Key Concepts

### 1. Knowledge as Tool

Knowledge isn't something we have—it's something we use.

> "Knowing is not a matter of possessing a set of abstract propositions, but rather a capability for interacting with the world."

**Example:** A mechanic doesn't just "know" about engines—they can diagnose and fix them in specific situations.

### 2. Learning as Participation

We learn by participating in communities of practice, not by receiving abstract knowledge.

**Traditional View:** Learn theory → Apply to practice
**Situated View:** Participate in practice → Develop understanding

### 3. Authentic Activity

Learning happens best in authentic contexts, not artificial classroom situations.

## Implications for AI Systems

### Why Current AI Systems Fail

This paper explains why many AI systems struggle:

1. **Decontextualized Training**: Models trained on abstract data without real-world context
2. **Lack of Embodiment**: No physical experience to ground understanding
3. **Missing Social Context**: No participation in communities of practice

### Better AI Design

Based on situated cognition:

```python
# Traditional AI approach
class AbstractAI:
    def __init__(self):
        self.knowledge_base = load_facts()

    def answer_question(self, question):
        return self.knowledge_base.search(question)

# Situated AI approach
class SituatedAI:
    def __init__(self, context):
        self.context = context
        self.experience_history = []
        self.community_knowledge = CommunityKnowledge()

    def respond_to_situation(self, situation):
        # Ground response in context
        relevant_experience = self.find_relevant_experience(situation)
        community_input = self.community_knowledge.consult(situation)

        return self.generate_situated_response(
            situation, relevant_experience, community_input
        )
```

## Real-World Applications

### 1. Education Technology

**Bad:** Abstract lessons with quizzes
**Good:** Virtual apprenticeships where students learn by doing

### 2. Medical AI

**Bad:** Symptom checker with abstract knowledge
**Good:** Diagnostic assistant that learns from clinical cases

### 3. Customer Support

**Bad:** FAQ search with canned responses
**Good**: Contextual assistant that understands customer situations

## My Projects and Situated Cognition

### RAG System Revolution

This paper helped me understand why my RAG system worked better than abstract classifiers:

**Traditional Approach:**
```python
# Abstract classification
def classify_product(description):
    category = ml_model.predict(description)
    return category
```

**Situated Approach:**
```python
# Contextual understanding
def understand_catalog_need(query, business_context):
    relevant_situations = find_similar_business_cases(query)
    category = recommend_based_on_context(relevant_situations)
    return category, supporting_evidence, similar_cases
```

### Medical Research Platform

The insight that medical knowledge is situated explained why doctors rejected my first system:

**What I missed:**
- Medical knowledge is practiced, not just known
- Context matters more than accuracy
- Social validation is crucial

**What I fixed:**
- Added clinical context to every recommendation
- Included similar cases and outcomes
- Built collaborative validation into the system

## Critiques and Limitations

### 1. Overemphasis on Context
The theory can underplay the value of abstract knowledge and transfer.

### 2. Practical Implementation
Difficult to scale situated learning to large populations.

### 3. Assessment Challenges
Hard to measure situated learning with traditional tests.

## Modern Relevance

### In Age of AI

This paper is more relevant than ever because:

1. **LLMs demonstrate abstract knowledge without understanding**
2. **AI lacks embodied experience**
3. **Context is crucial for practical AI applications**

### Specific Examples

**ChatGPT:** Knows everything but understands nothing
**Self-driving cars:** Need real-world driving experience
**Medical AI:** Must understand clinical context

## Actionable Insights

### For AI Builders

1. **Ground AI in real contexts**: Use real-world data, not synthetic data
2. **Include contextual information**: Don't just process text, understand situations
3. **Learn from interaction**: Build systems that improve through use
4. **Social validation**: Incorporate human feedback and expertise

### For Product Design

1. **Study actual usage**: Don't rely on abstract user models
2. **Design for contexts**: Consider where and how products will be used
3. **Enable participation**: Let users co-create meaning
4. **Community integration**: Build for social contexts, not individuals

## Related Concepts

- **Embodied Cognition**: Mind and body are not separate
- **Distributed Cognition**: Knowledge exists across people and artifacts
- **Activity Theory**: Understanding human activity as the unit of analysis
- **Communities of Practice**: Learning through social participation

## Questions for Further Thought

1. **How can we build AI with real-world experience?**
2. **What does "context" mean for digital systems?**
3. **How do we scale situated learning?**
4. **Can AI ever truly "understand" without embodiment?**

## Influence on My Thinking

This paper fundamentally changed how I approach AI:

**Before:** Build systems with more data and better algorithms
**After:** Build systems that understand context and learn from experience

It's why I focus on:
- **RAG systems** over pure generation
- **Human-in-the-loop** over full automation
- **Contextual understanding** over abstract knowledge
- **Community learning** over individual optimization

---

**My Rating**: ⭐⭐⭐⭐⭐ (Foundational for understanding AI limitations)

**Time Investment**: 45 minutes (academic paper, dense but worth it)

**Re-read Frequency**: Every 2 years

**Prerequisite**: Basic understanding of cognitive science or AI