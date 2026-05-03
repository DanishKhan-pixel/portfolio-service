"""
Management command: seed_portfolio
Seeds portfolio data from a resume/CV into core models.
"""

from datetime import date

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.portfolio.models import Certification, Education, Experience, Profile, Project, Skill


PROFILE_DATA = {
    "full_name": "MUHAMMAD DANISH",
    "title": "Software Engineer | Python/Django & AI Developer | Lahore, Pakistan",
    "bio": (
        "Backend Engineer with 2+ years of experience designing high-performance APIs "
        "and microservices using Python, Django, FastAPI, and Falcon. Specialized in "
        "AI-driven systems with hands-on experience in LangChain, RAG, and OpenAI "
        "integrations. Skilled in optimizing backend performance, reducing latency, and "
        "deploying scalable solutions using Docker and AWS. Strong focus on building "
        "efficient, data-driven, and production-ready systems.\n\n"
        "Contact: danishofficial764@gmail.com | +92-332-7683063"
    ),
    "years_of_experience": 2,
    "email": "danishofficial764@gmail.com",
    "linkedin_url": "https://linkedin.com/in/danish-khan-alpha",
    "github_url": "https://github.com/DanishKhan-pixel",
}


SKILLS = [
    ("Python", "Backend"), ("Django", "Backend"), ("FastAPI", "Backend"),
    ("Falcon API", "Backend"), ("Django REST Framework", "Backend"), ("Node.js", "Backend"),
    ("Microservices Architecture", "DevOps"), ("Docker", "DevOps"), ("Kubernetes", "DevOps"),
    ("RabbitMQ", "DevOps"), ("Git", "Tools"), ("GitHub Actions", "DevOps"),
    ("Jenkins", "DevOps"), ("AWS", "DevOps"), ("Render", "DevOps"), ("Railway", "DevOps"),
    ("LangChain", "Other"), ("RAG", "Other"), ("OpenAI API", "Other"),
    ("Computer Vision", "Other"), ("HuggingFace", "Other"), ("Claude Code", "Other"),
    ("Ollama", "Other"), ("PostgreSQL", "Database"), ("MySQL", "Database"),
    ("SQLite", "Database"), ("Firebase", "Database"), ("YugabyteDB", "Database"),
    ("NSQ", "Tools"), ("Pytest", "Tools"), ("Unit Testing", "Tools"),
    ("Postman", "Tools"), ("Swagger/OpenAPI", "Tools"), ("Apidog", "Tools"),
]


EXPERIENCES = [
    {
        "company_name": "CodeExpedition",
        "role": "Software Engineer – Python Developer",
        "start_date": date(2025, 11, 1),
        "end_date": date(2026, 3, 31),
        "description": "Worked on enterprise-scale automotive data systems and low-latency APIs.",
        "description_bullets": [
            "Implemented distributed SQL storage with YugabyteDB for scalable and fault-tolerant datasets.",
            "Optimized high-throughput ingestion workflows for real-time inventory and transaction streams.",
            "Maintained Falcon microservice APIs for ultra-low latency automotive data pipelines.",
        ],
        "technologies_used": ["Python", "Falcon API", "YugabyteDB", "Microservices"],
        "order": 1,
    },
    {
        "company_name": "Koraspond – 360° Digital Marketing Agency",
        "role": "Backend Python Developer",
        "start_date": date(2024, 10, 1),
        "end_date": date(2025, 11, 30),
        "description": "Built and deployed SaaS backends with strong security and multi-tenancy.",
        "description_bullets": [
            "Developed SaaS products using Django REST Framework and microservices architecture.",
            "Implemented RBAC and JWT authentication across SaaS modules.",
            "Deployed and maintained Dockerized microservices on AWS EC2.",
        ],
        "technologies_used": ["Python", "Django", "DRF", "Docker", "AWS EC2", "JWT"],
        "order": 2,
    },
    {
        "company_name": "Giga Developers",
        "role": "Python Developer",
        "start_date": date(2022, 2, 1),
        "end_date": date(2023, 12, 31),
        "description": "Contributed to Python/Django development and internal engineering capability.",
        "description_bullets": [
            "Led internal Python and Django training workshops for 20 developers.",
        ],
        "technologies_used": ["Python", "Django"],
        "order": 3,
    },
]


PROJECTS = [
    {
        "name": "Stylz – SaaS Barber Shop Management",
        "slug": "stylz-saas-barber-shop-management",
        "description": "Appointment, POS and analytics platform for multi-branch businesses.",
        "tech_stack": ["Python", "Django", "Django REST Framework", "MySQL"],
        "key_features": [
            "Multi-branch analytics dashboard with real-time reporting.",
            "Appointment scheduling and POS backend APIs with RBAC.",
        ],
        "featured": True,
        "order": 1,
    },
    {
        "name": "Pulsse – Microservices SaaS Platform",
        "slug": "pulsse-microservices-saas-platform",
        "description": "Modular platform with RBAC, subscriptions and monitoring.",
        "tech_stack": ["Python", "Django", "Django REST Framework", "FastAPI", "PostgreSQL"],
        "key_features": [
            "Subscription workflows with billing cycles, upgrades and usage tracking.",
            "CI/CD pipelines using GitHub Actions and AWS EC2.",
        ],
        "featured": True,
        "order": 2,
    },
    {
        "name": "Vinaudit – Automotive Data Monitoring Platform",
        "slug": "vinaudit-automotive-data-monitoring-platform",
        "description": "Enterprise-scale ingestion and monitoring of automotive listing data.",
        "tech_stack": ["Python", "Falcon API", "YugabyteDB", "NSQ"],
        "key_features": [
            "Large-scale ingestion from dealers, CSV files and external APIs.",
            "Optimized NSQ consumer pipelines for low-latency processing.",
        ],
        "featured": False,
        "order": 3,
    },
]


EDUCATION = [
    {
        "institute_name": "University of Haripur, KPK, Pakistan",
        "degree": "Bachelor of Science in Software Engineering",
        "start_year": 2020,
        "end_year": 2024,
        "description": "",
        "order": 1,
    }
]


CERTIFICATIONS = [
    (
        "AI Fluency Framework & Foundations",
        "Anthropic Education",
        "/media/certificates/ai-fluency-framework-foundations.pdf",
    ),
    (
        "Claude Code in Action",
        "Anthropic Education",
        "/media/certificates/claude-code-in-action.pdf",
    ),
    (
        "Claude 101",
        "Anthropic Education",
        "/media/certificates/claude-101.pdf",
    ),
    ("Python Developer", "Coursera", ""),
]


class Command(BaseCommand):
    help = "Seed core portfolio data (profile, skills, projects, experience, education, certifications)"

    def handle(self, *args, **options):
        # Profile singleton style upsert
        profile = Profile.objects.first()
        if profile:
            for key, value in PROFILE_DATA.items():
                setattr(profile, key, value)
            profile.save()
            self.stdout.write(self.style.SUCCESS("Profile updated"))
        else:
            Profile.objects.create(**PROFILE_DATA)
            self.stdout.write(self.style.SUCCESS("Profile created"))

        for index, (name, category) in enumerate(SKILLS, start=1):
            Skill.objects.update_or_create(
                name=name,
                defaults={
                    "category": category,
                    "proficiency_level": 85,
                    "order": index,
                },
            )
        self.stdout.write(self.style.SUCCESS(f"Skills upserted: {len(SKILLS)}"))

        for item in EXPERIENCES:
            Experience.objects.update_or_create(
                company_name=item["company_name"],
                role=item["role"],
                defaults=item,
            )
        self.stdout.write(self.style.SUCCESS(f"Experience entries upserted: {len(EXPERIENCES)}"))

        for item in PROJECTS:
            defaults = item.copy()
            defaults["slug"] = defaults.get("slug") or slugify(defaults["name"])
            Project.objects.update_or_create(
                slug=defaults["slug"],
                defaults=defaults,
            )
        self.stdout.write(self.style.SUCCESS(f"Projects upserted: {len(PROJECTS)}"))

        for item in EDUCATION:
            Education.objects.update_or_create(
                institute_name=item["institute_name"],
                degree=item["degree"],
                defaults=item,
            )
        self.stdout.write(self.style.SUCCESS(f"Education entries upserted: {len(EDUCATION)}"))

        for index, (name, org, credential_url) in enumerate(CERTIFICATIONS, start=1):
            Certification.objects.update_or_create(
                name=name,
                issuing_organization=org,
                defaults={
                    "issue_date": date(2024, 1, 1),
                    "order": index,
                    "credential_url": credential_url,
                },
            )
        self.stdout.write(self.style.SUCCESS(f"Certifications upserted: {len(CERTIFICATIONS)}"))

        self.stdout.write(self.style.SUCCESS("Portfolio resume data seeded successfully."))
