import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  BookOpen,
  Heart,
  ArrowRight,
  Cpu,
  UserCheck,
  MessagesSquare,
  CheckCircle,
  LayoutTemplate,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Personal Introduction */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About SAIL</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground">
              Hi! I'm Thibaud, a French engineer and educator who believes that
              everyone deserves to understand enough about AI safety to
              participate in the discussions that will shape our future,
              regardless of their native language.
            </p>
          </div>
        </div>
      </section>

      {/* Core Sections */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-primary" />
                  <CardTitle>Why I Created SAIL</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    When I looked for AI safety resources in languages other
                    than English, I found a striking gap. Most of the world's
                    population can't access even basic information about AI
                    safety in their native language. This isn't just an
                    educational oversight - it's a barrier to global
                    participation in crucial discussions about our future.
                  </p>
                  <p>
                    As someone who can read English resources, I realized I
                    could help bridge this gap. Not by creating cutting-edge
                    research, but by making the fundamental concepts of AI
                    safety accessible to everyone. Because everyone as a right
                    to understand and participate in the disscussions that will
                    shape our future.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <CardTitle>Learning Approach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p>
                    Drawing from my experience as an educator, I designed SAIL
                    around proven learning principles adapted for self-paced
                    discovery:
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Clear Learning Path
                    </h3>
                    <p>
                      Each lesson is structured into distinct concepts, with
                      clear indicators of what you should understand before
                      moving forward. This removes the anxiety of "am I ready
                      for the next step?" that often plagues self-learners.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Welcoming Questions
                    </h3>
                    <p>
                      Immediate answers to questions as they arise are crucial -
                      waiting to resolve doubts or interrupting study to search
                      elsewhere can derail the curiosity flow. The integrated
                      LLM feature ensures learners can maintain their learning
                      momentum, getting instant answers when clarification or
                      exploration is needed
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Active Learning
                    </h3>
                    <p>
                      The best way to verify understanding is to explain
                      concepts in your own words. Through the planned LLM
                      interaction, learners will be able to practice explaining
                      concepts and receive immediate feedback, identifying any
                      misunderstandings early in the learning process.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Visible Progress
                    </h3>
                    <p>
                      Learning complex topics can feel overwhelming. By breaking
                      down lessons into clear concepts and tracking progress,
                      learners can see their advancement and maintain
                      motivation. Each small win builds confidence for tackling
                      more challenging concepts.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Native Language First
                    </h3>
                    <p>
                      Understanding complex concepts is challenging enough
                      without language barriers. By providing content in the
                      learner's native language, we remove one layer of
                      cognitive load, allowing them to focus entirely on
                      understanding the concepts themselves.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Cpu className="w-6 h-6 text-primary" />
                  <CardTitle>Project Features & Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Core Features - 2 column grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Multilingual Framework
                        <Badge variant="outline" className="ml-2">
                          Ready
                        </Badge>
                      </h3>
                      <p>
                        Built-in translation support with separate content and
                        UI elements, making it easy to add new languages and
                        maintain translations.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-primary" />
                        Progress Tracking
                        <Badge variant="outline" className="ml-2">
                          Ready
                        </Badge>
                      </h3>
                      <p>
                        Secure user accounts and progress system to help
                        learners track their journey through the concepts.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <LayoutTemplate className="w-5 h-5 text-primary" />
                        Content Management
                        <Badge variant="outline" className="ml-2">
                          Ready
                        </Badge>
                      </h3>
                      <p>
                        Structured lesson format using markdown and JSON
                        templates, making it straightforward to add and
                        translate lessons.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-primary" />
                        Responsive Design
                        <Badge variant="secondary" className="ml-2">
                          In Progress
                        </Badge>
                      </h3>
                      <p>
                        Adaptive interface that works across devices, currently
                        being refined for better accessibility.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        AI Safety Overview
                        <Badge variant="secondary" className="ml-2">
                          In Progress
                        </Badge>
                      </h3>
                      <p>
                        A series of lessons covering fundamental AI safety
                        concepts, making the key ideas accessible to everyone.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <MessagesSquare className="w-5 h-5 text-primary" />
                        Learning Assistant
                        <Badge variant="secondary" className="ml-2">
                          Planned
                        </Badge>
                      </h3>
                      <p>
                        An AI tutor that answers your questions as you learn,
                        providing explanations and examples in your native
                        language.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Understanding Validation
                        <Badge variant="secondary" className="ml-2">
                          Planned
                        </Badge>
                      </h3>
                      <p>
                        A dedicated AI that evaluates your explanations,
                        ensuring deep understanding before moving to new
                        concepts.
                      </p>
                    </div>
                  </div>

                  {/* Current Development Status */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Current Focus
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        {" "}
                        Finishing the first lesson content {" "}
                      </li>
                      <li>
                        {" "}
                        Implementing LLM features for interactive learning{" "}
                      </li>
                      <li>Improving responsive design across devices</li>
                      <li>Testing translation workflow with real content</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Looking Forward</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    While I couldn't finish the entire project given the 20-hour
                    timeframe, I'm genuinely excited about its potential. Here's
                    what I envision for the next steps:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Complete the first set of fundamental AI safety lessons</li>
                    <li>Implement the LLM features for interactive learning</li>
                    <li>Add more language options beyond the initial set</li>
                    <li>Build a community of translators and contributors</li>
                  </ul>
                  <p className="mt-4">
                    My goal is to help people worldwide understand enough about
                    AI safety to participate in the conversations that will
                    shape our future. Because these conversations shouldn't be
                    limited by language barriers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">Thank You</h2>
          <p className="text-lg text-muted-foreground">
            Participating in the BlueDot Impact course has been an incredible
            journey. It pushed me to transform an idea into reality and
            connected me with others who care deeply about AI safety. While SAIL
            is still in its early stages, I'm sincerely grateful to Cohort 11
            for giving me the motivation to build its foundation.
          </p>
          <div className="pt-8">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/lessons">
                Explore SAIL <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
