'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { certificates } from '@/constant/certificates';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BorderBeam } from '../magicui/border-beam';

export default function CertificateTimeline() {
  return (
    <div className="container mx-auto py-12 md:pt-16 px-4 md:px-16 border rounded overflow-clip relative">
      <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
        <h2 className="text-4xl mb-4 font-bold text-black dark:text-white max-w-4xl">
          Certifications
        </h2>
      </div>

      <div className="mb-8 max-w-7xl mx-auto">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="relative flex gap-4 pb-8 border-l border-muted pl-6 last:border-l-transparent last:pb-0"
          >
            <div className="absolute left-[-12px] h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-background"></div>
            </div>

            <div className="flex-1 space-y-2 bg-card rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary/40">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                    <Image
                      src={certificate.logo || '/placeholder.svg'}
                      alt={certificate.organization}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {certificate.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {certificate.organization}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {certificate.issueDate}
                    </p>
                    {certificate.credentialId && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-bold">Credential ID:</span>{' '}
                        {certificate.credentialId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {certificate.credentialUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 mt-2"
                  asChild
                >
                  <Link target="_blank" href={certificate.credentialUrl}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Show credential
                  </Link>
                </Button>
              )}

              {certificate.skills.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-medium mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {certificate.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {certificate.description && (
                <div className="pt-2">
                  <p className="text-sm">{certificate.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <BorderBeam duration={30} size={150} />
    </div>
  );
}
