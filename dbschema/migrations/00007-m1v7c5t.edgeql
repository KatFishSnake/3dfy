CREATE MIGRATION m1v7c5tph4sv4r73tfklckfg3rphiytwlndgvieq7ve63fvlkpopza
    ONTO m13t62vv62juospye3lsx3fygds63cmf3awkxx5p2swvqaebchhkwa
{
  CREATE TYPE default::Generation {
      CREATE ACCESS POLICY admin_has_full_access
          ALLOW ALL USING (((GLOBAL default::current_user).userRole ?= default::Role.admin));
      CREATE REQUIRED LINK created_by: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE ACCESS POLICY creator_has_full_access
          ALLOW ALL USING ((.created_by ?= GLOBAL default::current_user));
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT, INSERT ;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY input: std::str;
      CREATE PROPERTY input_image_path: std::str;
      CREATE PROPERTY model: std::str;
      CREATE PROPERTY output: std::str;
      CREATE PROPERTY output_image_path: std::str;
      CREATE PROPERTY output_mtl_path: std::str;
      CREATE PROPERTY output_obj_path: std::str;
      CREATE PROPERTY output_texture_path: std::str;
      CREATE PROPERTY output_video_path: std::str;
      CREATE REQUIRED PROPERTY replicateId: std::str;
      CREATE REQUIRED PROPERTY status: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY urls: std::json;
  };
  DROP TYPE default::Item;
};
