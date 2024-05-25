CREATE MIGRATION m13t62vv62juospye3lsx3fygds63cmf3awkxx5p2swvqaebchhkwa
    ONTO m1oahnw4mmttenrs2qj3fp66wpmymvzo2q5xm5xcjwurr2wq5cdsyq
{
  ALTER TYPE default::User {
      ALTER LINK identity {
          DROP CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY avatarUrl: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY email {
          DROP CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY githubUsername: std::str {
          SET REQUIRED USING (<std::str>{});
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
