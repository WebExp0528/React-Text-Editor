<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190624112537 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE payment_data DROP name');
        $this->addSql('ALTER TABLE payment_data DROP postal_code');
        $this->addSql('ALTER TABLE payment_data DROP country');
        $this->addSql('ALTER TABLE plan DROP price');
        $this->addSql('ALTER TABLE plan DROP period');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE plan ADD price INT NOT NULL');
        $this->addSql('ALTER TABLE plan ADD period VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE payment_data ADD name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE payment_data ADD postal_code VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE payment_data ADD country VARCHAR(255) DEFAULT NULL');
    }
}
