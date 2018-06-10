# Generated by Django 2.0.6 on 2018-06-08 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HelperQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='TouristSpotImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(null=True, upload_to='data/images')),
            ],
        ),
        migrations.CreateModel(
            name='TouristSpotModel',
            fields=[
                ('key', models.CharField(default='yhMm5PGe0yp2KLE8bLkG', max_length=20, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=2000)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='touristspotimage',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='console_api.TouristSpotModel'),
        ),
    ]