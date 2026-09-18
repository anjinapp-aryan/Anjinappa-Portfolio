/**
 * Engineering Labs — hands-on experiments, explicitly NOT production work.
 *
 * Phase 9: populated from verified public repositories. These are presented
 * as labs rather than projects because that is what they are: local
 * simulations and learning experiments. Neither claims production use,
 * scale or results.
 *
 * Shape: { slug, title, description, technologies, github, demo }
 */
const labs = [
  {
    slug: "kafka-learning-lab",
    title: "Kafka Learning Lab",
    description:
      "Ten phases of Kafka experiments on a local KRaft broker — offsets and delivery semantics, consumer failure and rebalancing, producer reliability, consumer lag, replication and broker failure, and transactions/exactly-once with a banking saga. Built on top of the open-source suhailgupta/kafka playground; the phase experiments and their write-ups are the original work here.",
    technologies: ["Kafka", "Java", "Docker", "Kafbat UI", "KRaft"],
    github: "https://github.com/anjinapp-aryan/kafka_simulation",
    demo: null,
  },
  {
    slug: "aws-local-simulation",
    title: "AWS Local Simulation Lab",
    description:
      "Runs AWS service integrations entirely locally against a LocalStack-compatible emulator, provisioned with Terraform: a Spring Boot connectivity harness across S3, DynamoDB, SQS/SNS and Kinesis, a serverless task API using DynamoDB and S3 presigned URLs, and an order event pipeline (SNS → SQS with DLQ → DynamoDB/S3) implemented twice — once with the plain AWS SDK and once with Spring Cloud AWS — to compare the two. The same Terraform switches to real AWS by variable file, with no application code change.",
    technologies: [
      "AWS",
      "Terraform",
      "Spring Boot",
      "Java",
      "Python",
      "DynamoDB",
      "SQS",
      "SNS",
      "Kinesis",
      "S3",
      "Docker",
    ],
    github: "https://github.com/anjinapp-aryan/aws_simulation",
    demo: null,
  },
];

export default labs;
