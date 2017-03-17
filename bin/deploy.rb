#!/usr/bin/env ruby

# cf_distro = "E1ENR65WLK5LCW"
s3_dev = "s3://dev.mockbrian.com"
# s3_prod = "s3://mockbrian.com"

def make_favicon
  # system "convert", "favicon-16.png", "favicon-32.png", "favicon.ico"
end

def build
  system "yarn", "build"
end

def sync(bucket)
  system "aws", "s3", "sync",
    "--acl", "public-read",
    "build/",
    bucket
end

def invalidate(distro)
  system "aws", "cloudfront", "create-invalidation",
    "--distribution-id", distro,
    "--paths", "/*"
end

if ARGV.include?("-p")
  build
  sync s3_prod
  invalidate cf_distro
else
  build
  sync s3_dev
end